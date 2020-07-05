import { themeColors } from '@/utils/themeColors'

const colors = themeColors()

export const polarAreaChartData = {
  labels: ['Sales', 'Credits', 'Stock'],
  datasets: [
    {
      data: [80, 90, 70],
      borderWidth: 2,
      borderColor: [colors.themeColor1, colors.themeColor2, colors.themeColor3],
      backgroundColor: [
        colors.themeColor1_10,
        colors.themeColor2_10,
        colors.themeColor3_10
      ]
    }
  ]
}
