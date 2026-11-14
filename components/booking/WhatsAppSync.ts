export interface BookingData {
  fullName: string;
  phone: string;
  visitReason: string;
  preferredDate: string;
  preferredTime: string;
  companyName?: string;
  hasPrescription: boolean;
  notes?: string;
}

// Eyeris Opticals Official WhatsApp Store Number (Format: international without '+' or hyphens)
// Store Location: KPHB Road No. 1, Kukatpally, Hyderabad
export const EYERIS_WHATSAPP_NUMBER = "919876543210"; 
export const EYERIS_STORE_PHONE = "+91 98765 43210";
export const EYERIS_LOCATION_URL = "https://maps.google.com/?q=Eyeris+Opticals+KPHB+Road+No+1+Kukatpally+Hyderabad";
export const EYERIS_ADDRESS = "Plot #14, KPHB Road No. 1, Adjacent to Global Eye Hospital, Kukatpally, Hyderabad - 500072";

export function generateWhatsAppBookingUrl(data: BookingData): string {
  const messageLines = [
    `*EYE APPOINTMENT & STYLING VIP PASS — EYERIS OPTICALS* 👓✨`,
    `📍 *Location:* KPHB Road No. 1, Kukatpally (Adj. Global Eye Hospital)`,
    ``,
    `*Patient / Customer Details:*`,
    `• *Name:* ${data.fullName}`,
    `• *Contact:* ${data.phone}`,
    `• *Reason for Visit:* ${data.visitReason}`,
    `• *Scheduled Date:* ${data.preferredDate}`,
    `• *Scheduled Slot:* ${data.preferredTime}`,
    data.companyName ? `• *Corporate Optical Claim:* Yes (${data.companyName})` : `• *Corporate Claim:* General Consultation`,
    `• *Existing Hospital Rx:* ${data.hasPrescription ? "Yes (Bringing printout / Global Eye Rx)" : "No (Need comprehensive vision checkup)"}`,
    data.notes ? `• *Special Requests:* ${data.notes}` : ``,
    ``,
    `_Hello Team Eyeris! Please confirm this slot reservation. Looking forward to visiting your store._`
  ].filter(line => line !== null);

  const encodedMessage = encodeURIComponent(messageLines.join("\n"));
  return `https://wa.me/${EYERIS_WHATSAPP_NUMBER}?text=${encodedMessage}`;
}

export function generateQuickChatUrl(topic: string): string {
  const message = `Hello Eyeris Opticals! I'm interested in *${topic}* at your KPHB Road No. 1 store. Could you share more details on availability & pricing?`;
  return `https://wa.me/${EYERIS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function createWhatsAppBookingLink(customMessage: string): string {
  return `https://wa.me/${EYERIS_WHATSAPP_NUMBER}?text=${encodeURIComponent(customMessage)}`;
}
