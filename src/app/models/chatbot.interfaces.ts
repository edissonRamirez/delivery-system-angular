export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'info' | 'success' | 'error' | 'warning' | 'confirmation';
  data?: any;
}

export interface Intent {
  name: string;
  entity: 'order' | 'customer' | 'product' | 'restaurant' | 'motorcycle' | 'menu' | 'issue';
  action: 'create' | 'update' | 'delete' | 'search' | 'list' | 'query';
  confidence: number;
}

export interface ChatResponse {
  message: string;
  type: 'info' | 'success' | 'error' | 'warning' | 'confirmation';
  data?: any;
  requiresConfirmation?: boolean;
  pendingAction?: any;
}

export interface GeminiRequest {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export interface ExtractedParams {
  entity?: string;
  action?: string;
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  email?: string;
  phone?: string;
  quantity?: number;
  status?: string;
  customer_name?: string;
  product_name?: string;
  [key: string]: any;
}
