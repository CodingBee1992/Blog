import { Cell, Pie, PieChart, type PieLabelRenderProps } from 'recharts'

interface PieChartCardProps {
	isAnimationActive?: boolean
	data?: { name: string; value: number,colors:string }[]
}

const RADIAN = Math.PI / 180
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: PieLabelRenderProps) => {
	if (cx == null || cy == null || innerRadius == null || outerRadius == null) {
		return null
	}
	const radius = innerRadius + (outerRadius - innerRadius) * 0.2
	const ncx = Number(cx)
	const x = ncx + radius * Math.cos(-(midAngle ?? 0) * RADIAN)
	const ncy = Number(cy)
	const y = ncy + radius * Math.sin(-(midAngle ?? 0) * RADIAN)

	return (
		<text x={x} y={y} fill="white" fontSize={'16px'} textAnchor={x > ncx ? 'start' : 'end'} dominantBaseline="central">
			{`${((percent ?? 1) * 100).toFixed(0)}%`}
		</text>
	)
}

const PieChartCard = ({ isAnimationActive = true, data }: PieChartCardProps) => {
	return (
		<PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }} responsive>
			<Pie
				data={data}
				labelLine={false}
				label={renderCustomizedLabel}
				fill="#8884d8"
				dataKey="value"
				isAnimationActive={isAnimationActive}>
				{data?.map((entry) => (
					<Cell key={`cell-${entry.name}`} fill={entry.colors} />
				))}
			</Pie>
		</PieChart>
	)
}

export default PieChartCard
