declare global {
    interface Window {
      Telegram: {
        WebApp: {
          // sendData: (data: string) => void;
          enableClosingConfirmation: () => void;
          expand: () => void;
          ready: () => void;
          WebAppUser?: {
            id: number;
          };
          initData: string;
          initDataUnsafe: {
            user: {
              user_id?: number;
              is_bot?: boolean;
              first_name?: string;
              last_name?: string;
              username?: string;
              language_code?: string;
              is_premium?: boolean;
              added_to_attachment_menu?: boolean;
              allows_write_to_pm?: boolean;
              photo_url?: string
            }
          };
          openLink: (url: string, options?: {try_instant_view: boolean}[]) => void;
          isExpanded?: boolean;
          openTelegramLink: (url: string) => void
        };
      };
    }
  }
  
  export {};
  