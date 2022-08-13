const locationOptions = {
	enableHighAccuracy: true,
	timeout: 5000,
	maximumAge: 0,
}

function error(err: GeolocationPositionError) {
	console.error(err.message)
	alert("Access to location not given")
}

export function runGeolocationWithCallback(
	callback: ({ coords: user }: GeolocationPosition) => void
) {
	navigator.geolocation.getCurrentPosition(callback, error, locationOptions)
}

// https://www.movable-type.co.uk/scripts/latlong.html
export function calcCrowFliesDistanceBetweenCoordinates(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
): number {
	const R = 6371e3 // metres
	const φ1 = (lat1 * Math.PI) / 180 // φ, λ in radians
	const φ2 = (lat2 * Math.PI) / 180
	const Δφ = ((lat2 - lat1) * Math.PI) / 180
	const Δλ = ((lon2 - lon1) * Math.PI) / 180

	const a =
		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

	const d = R * c // in metres
	return d
}
