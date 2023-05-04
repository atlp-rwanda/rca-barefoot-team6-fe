import { useState } from "react";
import { MapContainer, TileLayer , Marker , Popup} from "react-leaflet";
import Header from '../../components/molecules/Header'
import Sidebar from '../../components/molecules/Sidebar'
import "./style.css"
import "leaflet/dist/leaflet.css"
// import L from "leaflet"

export default function Map() {   
    const [center, setCenter] = useState({ lat: -1.9437057, lng: 29.8805778 });
    // const markerIcon = new L.Icon({
    //   iconUrl: "https://static.thenounproject.com/png/4310601-200.png",
    //   iconSize: [35, 45],   
    //   iconAnchor: [17, 46],   
    //   popupAnchor: [0, -46]
    // });
  return (
    <div className="flex">
    <Sidebar />
    <div className="flex flex-col flex-grow">
        <Header />    
      <div className="col">   
        <MapContainer center={center} zoom={9} >        
        <TileLayer
         url="https://api.maptiler.com/maps/outdoor-v2/256/{z}/{x}/{y}.png?key=P9a2DSc1jdhsZIwOEyNe" attribution={"\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e"}
           />

          <Marker position={center} >
            <Popup>
             <b>Kigali Internation Airport</b>
            </Popup>
           </Marker>
          </MapContainer>
          
          </div> 
    </div>
</div>
      
  
  )
}
