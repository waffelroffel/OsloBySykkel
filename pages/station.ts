import { calcCrowFliesDistanceBetweenCoordinates } from "./location"

export interface StationInfo {
	station_id: string
	name: string
	address: string
	rental_uris: {
		android: string
		ios: string
	}
	lat: number
	lon: number
	capacity: number
}

export interface StationStatus {
	is_installed: number // 1 or 0
	is_renting: number // 1 or 0
	is_returning: number // 1 or 0
	last_reported: number
	num_bikes_available: number
	num_docks_available: number
	station_id: string
}

export type StationData = StationInfo & StationStatus & { distance?: number }

export function calcDistance(
	user: GeolocationCoordinates,
	station: StationInfo
) {
	return +calcCrowFliesDistanceBetweenCoordinates(
		user.latitude,
		user.longitude,
		station.lat,
		station.lon
	).toFixed(0)
}
