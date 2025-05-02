# Library Components

This directory contains UI components for the E-Library feature in the School Management System.

## 📚 Features

- **Resource Management**: Add, view, and download educational resources
- **Resource Categories**: Organize materials by subject, grade, and type
- **Resource Details**: Display metadata and preview materials
- **Search & Filter**: Find resources using various criteria

## 📁 Components

- `AddResourceModal.jsx`: Modal for uploading new educational materials
- `ResourceCard.jsx`: Card displaying resource thumbnail and basic info
- `ResourceDetailModal.jsx`: Detailed view of a resource with download options

## 🔄 Usage

These components are primarily used in the E-Library pages:

```jsx
import { 
  AddResourceModal, 
  ResourceCard, 
  ResourceDetailModal 
} from '@/components/library';

// Example usage
<ResourceCard 
  resource={resourceData} 
  onClick={handleViewResource} 
/>
```

## 📝 Resource Structure

Resources follow this data structure:

```typescript
interface Resource {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  thumbnailUrl: string;
  fileType: string; // pdf, doc, ppt, video, etc.
  fileSize: number; // in bytes
  uploadedBy: string;
  uploadDate: string;
  category: string;
  subject?: string;
  grade?: string;
  language?: string;
  downloadCount: number;
  tags: string[];
}
```

## 🔗 Related

- Library pages: `/src/pages/library`
- Library services: `/src/services/domains/library.js`
- Mock data: `/src/mock/db.js` (library section) 