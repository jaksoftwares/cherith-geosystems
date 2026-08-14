import { MessageType } from "./actions";

export interface NormalizedMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  type: MessageType;
  status: string;
  created_at: string;
  
  // Normalized detail fields depending on the type
  message?: string;       // General Inquiry
  location?: string;      // Survey Request
  survey_type?: string;   // Survey Request
  service?: string;       // Quote Request
  details?: string;       // Quote Request
  topic?: string;         // Consultation
  description?: string;   // Consultation
}
