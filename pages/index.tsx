import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import styles from "../styles/Home.module.css"
import { fetchStationData } from "./fetch"
import { runGeolocationWithCallback } from "./location"
import { calcDistance, StationData } from "./station"

const Home: NextPage = () => {
	const [stationDataList, setStationDataList] = useState<StationData[]>([])

	useEffect(() => {
		fetchStationData()
			.then(setStationDataList)
			.catch(e => console.error(e.message))
	}, [])

	const sortBtnClicked = () => {
		runGeolocationWithCallback(({ coords: user }: GeolocationPosition) => {
			const sortedStationDataList = stationDataList
				.map(station => {
					station.distance = calcDistance(user, station)
					return station
				})
				.sort((a, b) => (a.distance ?? 9999999) - (b.distance ?? 9999999))

			setStationDataList(sortedStationDataList)
		})
	}

	return (
		<div className="table-wrapper">
			<button onClick={sortBtnClicked}>Sorter på nærmeste</button>
			<table className="fl-table">
				<thead>
					<tr>
						<th>Stasjon</th>
						<th>Adresse</th>
						<th>Ledige Sykler</th>
						<th>Ledige Plasser</th>
						<th>Avstand</th>
						<th>Vis i Kart</th>
					</tr>
				</thead>
				<tbody>
					{stationDataList.map(station => (
						<tr key={station.station_id}>
							<td>{station.name}</td>
							<td>{station.address}</td>
							<td>{station.num_bikes_available}</td>
							<td>{station.num_docks_available}</td>
							<td>{station.distance ?? "?"} m</td>
							<td>
								<a
									href={`https://www.google.com/maps/@${station.lat},${station.lon},18z`}
									target="_blank"
									rel="noopener noreferrer"
								>
									<button>🗺️</button>
								</a>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Home
