import { toast } from 'sonner';

export const addNotification = {
  success: (message: string) => toast.success(message, { position: "top-right" }),
  info: (message: string) => toast.info(message, { position: "top-right" }),
  warning: (message: string) => toast.warning(message, { position: "top-right" }),
  error: (message: string) => toast.error(message, { position: "top-right" })
};
