export type Role = "CLIENT" | "PROFESSIONAL" | "ADMIN";
export type AccountType = "INDIVIDUAL" | "EMPLOYER";
export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type ConsultationType = "ONLINE" | "IN_PERSON";
export type BookingStatus = "PENDING_PAYMENT" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type ResourceCategory = "GUIDE" | "TEMPLATE" | "LAW" | "CALCULATOR" | "ARTICLE" | "WEBINAR";
export type Audience = "EMPLOYEE" | "EMPLOYER" | "HR" | "BOTH";
export type Urgency = "TODAY" | "WITHIN_48H" | "THIS_WEEK" | "NOT_URGENT";
export type ProfessionalType =
  | "Attorney"
  | "HR Professional"
  | "Employee Relations Practitioner"
  | "CCMA Practitioner"
  | "Mediator"
  | "Labour Consultant"
  | "Disciplinary Specialist";

export const resourceCategoryLabels: Record<ResourceCategory, string> = {
  GUIDE: "Essential Guides",
  TEMPLATE: "Templates & Letters",
  LAW: "Laws & Legislation",
  CALCULATOR: "Calculators & Tools",
  ARTICLE: "Articles & Insights",
  WEBINAR: "Webinars & Videos",
};

export const bookingStatusLabels: Record<BookingStatus, string> = {
  PENDING_PAYMENT: "Awaiting Payment",
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export const urgencyLabels: Record<Urgency, string> = {
  TODAY: "Today",
  WITHIN_48H: "Within 48 hours",
  THIS_WEEK: "This week",
  NOT_URGENT: "Not urgent",
};

export const professionalTypes: ProfessionalType[] = [
  "Attorney",
  "HR Professional",
  "Employee Relations Practitioner",
  "CCMA Practitioner",
  "Mediator",
  "Labour Consultant",
  "Disciplinary Specialist",
];
