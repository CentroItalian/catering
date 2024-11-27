import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";

export async function POST(req: Request) {

    const { name, email, phone, message, subject } = await req.json();

    const authHeader = req.headers.get('Authorization');
    const secretToken = process.env.CONTACT_FORM_TOKEN;

    if (!authHeader || authHeader !== `Bearer ${secretToken}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    try {
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet('1hBXw3RJJ3iO4PKbbw5kmY6TQ1q4xzFuQ0BEH_Q6qJnA', serviceAccountAuth);

        await doc.loadInfo();
        const sheet = doc.sheetsByTitle['ContactSheet'];

        await sheet.addRow({ "Name": name, "Email": email, "Subject": subject, "Message": message, "Phone": phone });

        return new Response('Success', { status: 200 });
    } catch (error) {
        return new Response('Error loading Google Sheet', { status: 500 });
    }
}