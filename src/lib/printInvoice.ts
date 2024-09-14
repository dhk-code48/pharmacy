// import { Invoice, Order, Pharmacy, PharmacyAddress } from "@prisma/client";
// import jsPDF from "jspdf";
// import { formatDate } from "./format";

// const handlePrint = (pharmacy:Pharmacy&{address:PharmacyAddress},order:Order,invoice:Invoice) => {
//   // Create a new jsPDF instance
//   const pdf = new jsPDF({
//     format: "a4",
//     unit: "mm",
//   });

//   const pageWidth = pdf.internal.pageSize.getWidth(); // Get the page width

//   // Add font

//   // Set initial position
//   const imageWidth = 40; // Width of the image

//   let yPos = 20;

//   pdf.addImage("/logo.jpg", "JPG", pageWidth - imageWidth - 10, yPos - 10, imageWidth, 30);

//   // Add pharmacy details
//   pdf.setFontSize(18);
//   pdf.text(pharmacy.name, 20, yPos);
//   yPos += 10;
//   pdf.setFontSize(12);
//   pdf.text(`${pharmacy.address.municipality} - ${pharmacy.address.ward}, ${pharmacy.address.town}`, 20, yPos);
//   yPos += 20;

//   // Add invoice details
//   pdf.setFontSize(14);
//   pdf.text(`Invoice #: I-${invoice.id}`, 20, yPos);
//   yPos += 8;
//   pdf.text(`Order #: O-${order.id}`, 20, yPos);
//   yPos += 8;
//   pdf.text(`Date: ${formatDate(invoice.createdAt, "YYYY-MM-DD")}`, 20, yPos);
//   yPos += 20;

//   // Add customer details
//   pdf.text("Bill To:", 20, yPos);
//   yPos += 8;
//   pdf.text(session?.user?.name || "", 20, yPos);
//   yPos += 8;
//   pdf.text(`Email: ${session?.user?.email || ""}`, 20, yPos);
//   yPos += 20;

//   // Add payment method
//   pdf.setFontSize(12);
//   pdf.setTextColor(41, 128, 185);
//   pdf.text("Payment Method:", 120, yPos - 28);
//   pdf.setTextColor(0);
//   pdf.setFontSize(10);
//   pdf.text(invoice.paymentMethod, 120, yPos - 20);
//   yPos += 10;

//   // Add table headers
//   const headers = ["Medicine", "Dosage", "Quantity", "Price", "Total"];
//   const columnWidths = [60, 30, 30, 30, 30];
//   pdf.setFillColor(240, 240, 240);
//   pdf.rect(20, yPos, 170, 10, "F");
//   pdf.setTextColor(0);
//   pdf.setFontSize(12);
//   let xPos = 20;
//   headers.forEach((header, index) => {
//     pdf.text(header, xPos, yPos + 7);
//     xPos += columnWidths[index];
//   });
//   yPos += 15;

//   // Add table rows
//   pdf.setFontSize(10);
//   invoice.medicines.forEach((medicine) => {
//     xPos = 20;
//     pdf.text(medicine.name, xPos, yPos);
//     xPos += columnWidths[0];
//     pdf.text(medicine.dose, xPos, yPos);
//     xPos += columnWidths[1];
//     pdf.text(medicine.quantity.toString(), xPos, yPos, { align: "right" });
//     xPos += columnWidths[2];
//     pdf.text(`Rs. ${medicine.price.toFixed(2)}`, xPos, yPos, { align: "right" });
//     xPos += columnWidths[3];
//     pdf.text(`Rs. ${(medicine.quantity * medicine.price).toFixed(2)}`, xPos, yPos, { align: "right" });
//     yPos += 10;

//     if (yPos > 270) {
//       pdf.addPage();
//       yPos = 20;
//     }
//   });

//   // Add totals
//   yPos += 10;
//   pdf.line(20, yPos, 190, yPos);
//   yPos += 10;
//   pdf.text(`Subtotal: Rs. ${invoice.subTotal.toFixed(2)}`, 150, yPos, { align: "right" });
//   yPos += 8;
//   pdf.text(`Tax (8%): Rs. ${invoice.tax.toFixed(2)}`, 150, yPos, { align: "right" });
//   yPos += 8;
//   pdf.text(`Shipping: Rs. ${invoice.shippingPrice.toFixed(2)}`, 150, yPos, { align: "right" });
//   yPos += 8;
//   pdf.setFontSize(12);
//   pdf.text(`Total: Rs. ${invoice.total.toFixed(2)}`, 150, yPos, { align: "right" });

//   // Save the PDF
//   pdf.save(`Invoice_I-${invoice.id}.pdf`);
// };
