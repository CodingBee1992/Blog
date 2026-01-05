import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Dot, type DotItemDotProps } from 'recharts'

// #region Sample data
const data = [
	{
		name: '18/12/2025',
		Views: 48000,
	},
	{
		name: '19/12/2025',
		Views: 38000,
	},
	{
		name: '20/12/2025',
		Views: 20080,
	},
	{
		name: '21/12/2025',
		Views: 27880,
	},
	{
		name: '22/12/2025',
		Views: 18890,
	},
	{
		name: '23/12/2025',
		Views: 23890,
	},
	{
		name: '24/12/2025',
		Views: 53490,
	},
]
const CustomDot = (props: DotItemDotProps) => {
	const { cx, cy } = props
	return <Dot cx={cx} cy={cy} stroke="#FFFFFF" strokeWidth={2} fill="#00AB00" r={4} />
}
// #endregion
const StackedAreaChart = ({ styles }: { styles: Record<string, string> }) => {
	return (
		<AreaChart className={styles.areaChart}  responsive data={data}
            margin={{ right: 40, bottom: 30 }}
        >
			<defs>
				<linearGradient id="gradient1" x1="100%" y1="100%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />

					<stop offset="100%" stopColor="#008e00bb" stopOpacity={1} />
				</linearGradient>
			</defs>

			<CartesianGrid stroke="#ADADBA" strokeWidth={1} strokeDasharray="1 1" strokeLinecap="round" />
			<XAxis dataKey="name" fontSize={'12px'} stroke="#ADADBA" interval={0} tickMargin={10} />
			<YAxis width="auto" fontSize={'12px'} stroke="#ADADBA" tickMargin={5} />
			<Tooltip />
			

			<Area
				type="monotone"
				dataKey="Views"
				stackId="1"
				stroke="#24DC00"
				strokeWidth={2}
				fill="url(#gradient1)"
				dot={CustomDot}
				activeDot={{ r: 6 }}
			/>
		</AreaChart>
	)
}

export default StackedAreaChart
