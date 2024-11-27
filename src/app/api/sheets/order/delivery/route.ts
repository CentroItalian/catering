import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    const authHeader = req.headers.get('Authorization');
    const secretToken = process.env.CONTACT_FORM_TOKEN;

    if (!authHeader || authHeader !== `Bearer ${secretToken}`) {
        return new Response('Unauthorized', { status: 401 });
    }

    /*
        {
            cart: [ { name: 'Mini Meatballs', quantity: 6, instructions: '' } ],
            order_type: 'delivery',
            name: 'Akshat Jain',
            organization: '',
            email: 'akshat00jain@gmail.com',
            phone: '(078) 060-8097',
            date: '2024-11-28',
            time: '8:00',
            address: 'HC-20, Abhiruchi Parisar, Old Subhash Nagar',
            city: 'Bhopal',
            state: 'HI',
            zip_code: '462023',
            instructions: 'TEST',
            period: 'AM'
        }
    */

    const { cart, name, organization, email, phone, date, time, address, city, state, zip_code, instructions, period } = await req.json();

    try {
        const serviceAccountAuth = new JWT({
            email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: process.env.GOOGLE_PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const formattedCart = cart.map(({ name, quantity, instructions }: { name: string, quantity: string, instructions: string }) => `${name} x ${quantity}\n${instructions ? `(${instructions})` : ""}\n\n`.slice(0, -2)).join(', ');

        const doc = new GoogleSpreadsheet('1hBXw3RJJ3iO4PKbbw5kmY6TQ1q4xzFuQ0BEH_Q6qJnA', serviceAccountAuth);

        await doc.loadInfo();
        const sheet = doc.sheetsByTitle['DeliverySheet'];

        await sheet.addRow({
            "Name": name,
            "Org": organization || '',
            "Email": email,
            "Phone": phone,
            "Street_Address": address,
            "City": city,
            "State": state,
            "Zip": zip_code,
            "Date": date,
            "Time": `${time} ${period}`,
            "Order_Summary": formattedCart,
            "Instructions": instructions,
        })

        return new Response('Success', { status: 200 });
    } catch (error) {
        return new Response('Error loading Google Sheet', { status: 500 });
    }
}