// use std::process::Command;
// use tauri::command;

// #[command]
// fn print_text(text: String) -> Result<(), String> {
//     // Créer un fichier temporaire avec le texte
//     let temp_file = std::env::temp_dir().join("print_temp.txt");
//     std::fs::write(&temp_file, text).map_err(|e| e.to_string())?;

//     // Imprimer le fichier temporaire
//     let output = if cfg!(target_os = "windows") {
//         Command::new("cmd")
//             .args(&["/C", "print", "/D:", temp_file.to_str().unwrap()])
//             .output()
//             .map_err(|e| e.to_string())?
//     } else if cfg!(target_os = "macos") {
//         Command::new("lp")
//             .arg(temp_file.to_str().unwrap())
//             .output()
//             .map_err(|e| e.to_string())?
//     } else {
//         Command::new("lp")
//             .arg(temp_file.to_str().unwrap())
//             .output()
//             .map_err(|e| e.to_string())?
//     };

//     // Supprimer le fichier temporaire seulement si l'impression réussit
//     if output.status.success() {
//         std::fs::remove_file(temp_file).map_err(|e| e.to_string())?;
//         Ok(())
//     } else {
//         Err(String::from_utf8_lossy(&output.stderr).to_string())
//     }
// }

// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![print_text])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }


use std::process::Command;
use tauri::command;

#[command]
fn print_html(html: String) -> Result<(), String> {
    // Créer un fichier temporaire avec le HTML
    let temp_file = std::env::temp_dir().join("invoice.html");
    std::fs::write(&temp_file, html).map_err(|e| e.to_string())?;

    // Convertir le HTML en PDF avec wkhtmltopdf
    let pdf_file = std::env::temp_dir().join("invoice.pdf");
    let output = Command::new("C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe")
        .arg(temp_file.to_str().unwrap())
        .arg(pdf_file.to_str().unwrap())
        .output()
        .map_err(|e| format!("Failed to execute wkhtmltopdf: {}", e))?;
        

    if !output.status.success() {
        return Err(format!(
            "wkhtmltopdf failed: {}",
            String::from_utf8_lossy(&output.stderr)
        ));
    }

    // Imprimer le PDF
    let output = if cfg!(target_os = "windows") {
        Command::new("cmd")
            .args(&["/C", "print", "/D:", pdf_file.to_str().unwrap()])
            .output()
            .map_err(|e| format!("Failed to execute print command: {}", e))?
    } else {
        Command::new("lp")
            .arg(pdf_file.to_str().unwrap())
            .output()
            .map_err(|e| format!("Failed to execute lp command: {}", e))?
    };

    // Supprimer les fichiers temporaires
    std::fs::remove_file(temp_file).map_err(|e| e.to_string())?;
    std::fs::remove_file(pdf_file).map_err(|e| e.to_string())?;

    if output.status.success() {
        Ok(())
    } else {
        Err(format!(
            "Print command failed: {}",
            String::from_utf8_lossy(&output.stderr)
        ))
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![print_html])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}