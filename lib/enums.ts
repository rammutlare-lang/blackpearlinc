export type Role = "CLIENT" | "PROFESSIONAL" | "ADMIN";
export type AccountType = "INDIVIDUAL" | "EMPLOYER";
export type VerificationStatus = "PENDING" | "APPROVED" | "REJECTED";
export type ConsultationType = "ONLINE" | "IN_PERSON";
export type BookingStatus = "PENDING_PAYMENT" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "FAILED" | "REFUNDED";
export type ResourceCategory = "GUIDE" | "TEMPLATE" | "LAW" | "CALCULATOR" | "ARTICLE" | "WEBINAR";

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
