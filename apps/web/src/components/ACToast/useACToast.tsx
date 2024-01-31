import * as Toast from "@radix-ui/react-toast";
import { useEffect, useRef, useState } from "react";

type Props =
  | {
      title: string;
      description?: undefined;
    }
  | {
      title?: undefined;
      description: string;
    };

const useACToast = () => {
  const [title, setTitle] = useState<string>();
  const [description, setDescription] = useState<string>();

  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(0);

  const open = ({ title, description }: Props) => {
    title && setTitle(title);
    description && setDescription(description);

    setIsOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setIsOpen(true);
    }, 100);
  };

  const handleChangeOpen = (value: boolean) => {
    setIsOpen(value);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  return {
    show: open,
    render: () => (
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          className="ToastRoot"
          open={isOpen}
          onOpenChange={handleChangeOpen}
        >
          {title && <Toast.Title className="ToastTitle">{title}</Toast.Title>}
          {description && (
            <Toast.Description asChild>{description}</Toast.Description>
          )}
        </Toast.Root>
        <Toast.Viewport className="ToastViewport" />
      </Toast.Provider>
    ),
  };
};

export default useACToast;
