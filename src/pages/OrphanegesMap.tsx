import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../img/map-marker.svg';
import mapIcon from '../utils/mapIcons';

import '../styles/screens/orphanagesMap.css';
import api from '../services/api';

interface Orphanage {
	id: number;
	name: string;
	latitude: number;
	longitude: number;
}

function OrphanagesMap() {
	const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

	useEffect(() => {
		api.get('/orphanages').then(response => {
			setOrphanages(response.data);
		});
	}, []);

	return (
		<div id="page-map">
			<aside>
				<header>
					<img src={mapMarkerImg} alt="Happy" />

					<h2>Escolha um orfanato no mapa</h2>
					<p>Muitas crianças estão esperando a sua visita :)</p>
				</header>

				<footer>
					<strong>Belford Roxo</strong>
					<span>Rio de Janeiro</span>
				</footer>
			</aside>

			<Map
				center={[-22.7720466, -43.3950628]}
				zoom={12}
				style={{ width: '100%', height: '100%' }}
			>
				{/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
				<TileLayer
					url={`https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
				/>

				{orphanages.map(orphanage => {
					return (
						<Marker
							key={orphanage.id}
							icon={mapIcon}
							position={[orphanage.latitude, orphanage.longitude]}
						>
							<Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
								{orphanage.name}
								<Link to={`/orphanages/show/${orphanage.id}`}>
									<FiArrowRight size={20} color="#fff" />
								</Link>
							</Popup>
						</Marker>
					);
				})}
			</Map>

			<Link to="/orphanages/create" className="create-orphanage">
				<FiPlus size="32" color="#fff" />
			</Link>
		</div>
	);
}

export default OrphanagesMap;