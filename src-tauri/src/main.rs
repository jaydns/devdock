#![cfg_attr(
all(not(debug_assertions), target_os = "windows"),
windows_subsystem = "windows"
)]

use std::process::Command;
use tauri::Manager;
use window_vibrancy::{apply_acrylic, apply_vibrancy, NSVisualEffectMaterial};
use tokei::{Config, Languages};
use configparser::ini::Ini;

#[tauri::command]
fn get_lang_stats(path: &str) -> Languages {
    let paths = &[path];
    let excluded = &[];
    let config = Config::default();

    let mut languages = Languages::new();
    languages.get_statistics(paths, excluded, &config);

    return languages;
}

#[tauri::command]
fn get_remote_repo_url(path: &str) -> String {
    let mut config = Ini::new();
    config.load(path.to_owned() + "/.git/config").unwrap();
    let remote = config.get("remote \"origin\"", "url").unwrap();
    return remote.to_string();
}

#[tauri::command]
fn open_code_editor(path: &str, editor: &str) {
    let mut child = Command::new(editor)
        .arg(path)
        .spawn()
        .expect("failed to execute process");

    child.wait().expect("failed to wait for child to finish");
}

fn main() {
  tauri::Builder::default()
      .setup(|app| {
        let window = app.get_window("main").unwrap();

        #[cfg(target_os = "macos")]
        apply_vibrancy(&window, NSVisualEffectMaterial::Sidebar, None, None)
            .expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");

        #[cfg(target_os = "windows")]
        apply_acrylic(&window, Some((18, 18, 18, 125)))
            .expect("Unsupported platform! 'apply_blur' is only supported on Windows");

        Ok(())
      })
      .invoke_handler(tauri::generate_handler![get_lang_stats, get_remote_repo_url, open_code_editor])
      .run(tauri::generate_context!())
      .expect("error while running tauri application");
}
