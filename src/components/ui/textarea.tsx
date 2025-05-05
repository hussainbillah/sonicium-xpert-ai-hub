
import * as React from "react"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoResize = false, onChange, ...props }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    
    const resizeTextarea = () => {
      const textarea = textareaRef.current;
      if (!textarea || !autoResize) return;
      
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      
      // Set the height to match the content
      textarea.style.height = `${textarea.scrollHeight}px`;
    };
    
    useEffect(() => {
      if (autoResize) {
        resizeTextarea();
      }
    }, [props.value, autoResize]);
    
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e);
      }
      if (autoResize) {
        resizeTextarea();
      }
    };
    
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={(element) => {
          // Handle both the forwardRef and the local ref
          if (typeof ref === 'function') {
            ref(element);
          } else if (ref) {
            ref.current = element;
          }
          textareaRef.current = element;
        }}
        onChange={handleChange}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
