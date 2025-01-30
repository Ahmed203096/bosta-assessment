**Overview**
This is a single-page React application that allows users to track shipments by entering a Shipment Tracking Number. Users can view shipment details, track delivery progress, and switch between multiple languages (English & Arabic).

**Features**
✅ Shipment Search – Users can search shipments using a tracking number
✅ Shipment Details – Displays tracking number, status, and expected delivery date
✅ Delivery Timeline – Shows a progress timeline of shipment stages
✅ Localization – Supports English and Arabic
✅ Error Handling – Displays user-friendly error messages for invalid tracking numbers
✅ API Integration – Fetches shipment details from a mock API
✅ Responsive Design – Works on mobile, tablet, and desktop
✅ Performance Optimization – Implement lazy loading for assets or data, Optimize component rendering to ensure smooth performance, even with repeated searches.
✅ Dark Mode – Include a toggle for light and dark modes,

**Assume**
-tracking contains only from Numbers

**Extra Features**
✅ Frontend validation on tracking Number to contains only from Numbers

**Tech Stack**
React.js – Frontend Framework
CSS (Styled Components / Bootstrap/React Bootstrap) – For styling

**Installation & Setup**
1-Clone the Repository
"git clone https://github.com/yourusername/shipment-tracking.git"
"cd shipment-tracking"
2-Install Dependencies
"npm install"
3-Run the Development Server
"npm start"

 **API Integration**
This project fetches shipment data using a mock API:"GET https://tracking.bosta.co/shipments/track/:trackingNumber"
- Required Header: x-requested-by: Bosta
- Sample Tracking Numbers: 36406704, 69171493, 7234258, 9442984, 1094442

**Deployment**
To deploy the project, use:"npm run build"


