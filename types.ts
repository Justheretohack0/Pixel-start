
export interface Theme {
  name: string;
  colors: {
    bg: string;
    fg: string;
    muted: string;
    border: string;
    accent: string;
    hover: string;
  };
}

export interface TodoItem {
  id: number;
  text: string;
  done: boolean;
  due?: string;
}

export interface Link {
  label: string;
  url: string;
}

export interface LinkGroup {
  category: string;
  links: Link[];
}

export interface RealStats {
    os: string;
    browser: string;
    gpu: string;
    cores: number;
    memoryGB: number | null;
    network: { type: string; downlink: number | null };
}
