export const groupBy = (data, key) => {
	return data.reduce((acc, x) => {
	  acc[x[key]] = [...(acc[x[key]] || []), x];
	  return acc;
	}, {});
}