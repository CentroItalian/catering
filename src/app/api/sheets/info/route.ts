import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';

// 1ZG4H07LGaU2p4WFqArxRg2G3_Zc6tlehDLG1zIT2ov8

export async function GET(req: Request) {

    const serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet('11apCji2ji8-ktS8qtXNxlSuu5KkcD0fiyujFxENoAZM', serviceAccountAuth);

    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    // Add a new row with data from the request body
    await sheet.addRow({ name: 'John Doe', email: '123', phone: '45624'});

    // Send a success response
    return new NextResponse("A")
}
