'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import { Maximize2 } from 'lucide-react';

interface ScreenshotPreviewProps {
  previewSrc: string;
  fullSrc: string;
  alt: string;
  title: string;
  description: string;
  previewWidth: number;
  previewHeight: number;
  fullWidth: number;
  fullHeight: number;
}

export function ScreenshotPreview({
  previewSrc,
  fullSrc,
  alt,
  title,
  description,
  previewWidth,
  previewHeight,
  fullWidth,
  fullHeight,
}: ScreenshotPreviewProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className="group relative block w-full cursor-pointer overflow-hidden rounded-md border border-border bg-background text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
        onClick={() => setIsOpen(true)}
        aria-label={`View ${title} screenshot at full size`}
      >
        <Image
          src={previewSrc}
          alt={alt}
          width={previewWidth}
          height={previewHeight}
          className="h-auto w-full"
        />
        <span className="pointer-events-none absolute bottom-2 right-2 grid size-7 place-items-center rounded-sm border border-border bg-background/95 text-foreground">
          <Maximize2 aria-hidden="true" size={14} strokeWidth={1.5} />
          <span className="absolute right-full mr-2 whitespace-nowrap rounded-sm border border-border bg-background/95 px-2 py-1 font-mono text-[11px] text-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
            Open full image
          </span>
        </span>
      </button>

      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-0 h-dvh w-dvw max-w-none overflow-y-auto border-0 bg-transparent p-4 text-foreground backdrop:bg-black/55 sm:p-8"
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) setIsOpen(false);
        }}
        onClose={() => setIsOpen(false)}
      >
        <div className="mx-auto flex min-h-full max-w-6xl items-center">
          <div className="relative w-full rounded-md border border-border bg-background p-2 shadow-2xl sm:p-3">
            <button
              type="button"
              className="absolute right-4 top-4 z-10 min-h-11 rounded-sm bg-background/95 px-3 py-2 text-[13px] text-foreground shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              onClick={() => setIsOpen(false)}
              autoFocus
            >
              Close
            </button>
            <Image
              src={fullSrc}
              alt={alt}
              width={fullWidth}
              height={fullHeight}
              sizes="(max-width: 768px) 94vw, 90vw"
              className="h-auto w-full rounded-sm"
              priority={isOpen}
            />
            <p id={titleId} className="px-1 pb-1 pt-4 text-[15px] leading-relaxed text-muted sm:px-2">
              <span className="font-medium text-foreground">{title}.</span> {description}
            </p>
          </div>
        </div>
      </dialog>
    </>
  );
}
