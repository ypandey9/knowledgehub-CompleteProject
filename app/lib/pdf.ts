import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generateCertificatePDF({
    userName,
    courseTitle,
    certificateId,
} : {
    userName:string;
    courseTitle:string;
    certificateId:string;
}) {

    const pdfDoc=await PDFDocument.create();
    const page=pdfDoc.addPage([600,400]);
    const font=await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    page.drawText("Certificate of Completion",{
        x:120,
        y:330,
        size:24,
        font,
        color : rgb(0.2,0.2,0.8),
    });

    page.drawText(userName,{
        x:180,
        y:230,
        size:18,
        font,
    });

    page.drawText(`has sucessfully completed`,{
        x:170,
        y:200,
        size:12
    });

    page.drawText(courseTitle,{
        x:100,
        y:300,
        size:24,
        font,
    });

    page.drawText(`Certifcate ID :${certificateId}`,{
    x:180,
    y:120,
    size:10,
    });

    return await pdfDoc.save();
}