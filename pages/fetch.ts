// https://oslobysykkel.no/apne-data/sanntid
import { StationData, StationInfo, StationStatus } from "./station"

interface ResponseDataStations {
	data: { stations: StationInfo[] | StationStatus[] }
}

export const API = {
	STATION: {
		INFO: "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json",
		STATUS: "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json",
	},
}

const IDENTIFIER = "waffelroffel-bysykkelhjelper"

async function _fetch(api: string): Promise<StationInfo[] | StationStatus[]> {
	const res = await fetch(api, {
		headers: { "Client-Identifier": IDENTIFIER },
	})
	const json: ResponseDataStations = await res.json()
	return json.data.stations
}

export const fetchStationData = async (): Promise<StationData[]> => {
	const requests = [API.STATION.INFO, API.STATION.STATUS].map(api =>
		_fetch(api)
	)

	const [stationsInfo, stationStatuses] = (await Promise.all(requests)) as [
		StationInfo[],
		StationStatus[]
	]

	return stationsInfo.map(info =>
		Object.assign(
			info,
			stationStatuses.find(status => status.station_id === info.station_id)
		)
	)
}
