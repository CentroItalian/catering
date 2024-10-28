export function ContactFormTemplate(name: String, email: String, subject: String, message: String, phone: String) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .label {
            font-weight: bold;
            color: #555;
        }
        .value {
            margin-top: 5px;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 4px;
            border: 1px solid #ccc;
            white-space: pre-wrap;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>New Contact Form Submission</h2>
        <div class="form-group">
            <div class="label">Name:</div>
            <div class="value">${name}</div>
        </div>
        <div class="form-group">
            <div class="label">Email:</div>
            <div class="value">${email}</div>
        </div>
        <div class="form-group">
            <div class="label">Phone:</div>
            <div class="value">${phone}</div>
        </div>
        <div class="form-group">
            <div class="label">Subject:</div>
            <div class="value">${subject}</div>
        </div>
        <div class="form-group">
            <div class="label">Message:</div>
            <div class="value">${message}</div>
        </div>
    </div>
</body>
</html>`;
}