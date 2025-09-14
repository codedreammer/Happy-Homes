declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      src?: string;
      ar?: boolean;
      'ar-modes'?: string;
      'ar-placement'?: string;
      'camera-controls'?: boolean;
      'auto-rotate'?: boolean;
      loading?: string;
      alt?: string;
    };
  }
}