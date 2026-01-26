import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Dot, type DotItemDotProps } from 'recharts'

interface StackedAreaChartProps {
	styles: Record<string, string>
	data: {
		date: string
		views: number
	}[]
	days:number
}


const CustomDot = (props: DotItemDotProps) => {
	const { cx, cy } = props
	return <Dot cx={cx} cy={cy} stroke="#FFFFFF" strokeWidth={2} fill="#00AB00" r={4} />
}
// #endregion
const StackedAreaChart = ({ data, styles,days }: StackedAreaChartProps) => {
	
	return (
		<AreaChart className={styles.areaChart} responsive data={data} margin={{ right: 30, bottom: 30 }}>
			<defs>
				<linearGradient id="gradient1" x1="100%" y1="100%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="#FFFFFF" stopOpacity={1} />

					<stop offset="100%" stopColor="#008e00bb" stopOpacity={1} />
				</linearGradient>
			</defs>

			<CartesianGrid stroke="#ADADBA" strokeWidth={1} strokeDasharray="1 1" strokeLinecap="round" />
			<XAxis
				dataKey="date"
				tickFormatter={value => new Date(value).toLocaleDateString()}
				fontSize={'12px'}
				stroke="#ADADBA"
				interval={days === 7 ? 0 : 6}
				tickMargin={10}
				
				
			/>
			<YAxis width={50} fontSize={'12px'}  stroke="#ADADBA" tickMargin={5}/>
			<Tooltip labelFormatter={value => new Date(value).toLocaleDateString()} />

			<Area
				type="monotone"
				dataKey="views"
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
