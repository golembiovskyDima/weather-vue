
type LocationReturnType = {
	lat: number,
	lon: number
}

const getCurrentLocation = (): Promise<LocationReturnType> => {
	let reslovePromise: ((arg: any) => void) | null = null;
	let rejectPromise: ((error: any) => void) | null = null;

	const success = ({ coords }: any) => {
		if (reslovePromise) {
			reslovePromise({
				lat: coords.latitude,
				lon: coords.longitude,
			});
		}
	}

	const error = (err: any) => {
		if (rejectPromise) {
			rejectPromise(err)
		}
	}

	navigator.geolocation.getCurrentPosition(success, error);

	return new Promise((reslove, reject) => {
		reslovePromise = reslove;
		rejectPromise = reject;
	});
}

export default {
	getCurrentLocation,
}