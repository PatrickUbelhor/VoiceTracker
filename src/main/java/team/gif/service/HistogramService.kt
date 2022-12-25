package team.gif.service

import java.util.LinkedList
import org.apache.logging.log4j.LogManager
import org.apache.logging.log4j.Logger
import org.springframework.stereotype.Service
import team.gif.model.Channel
import team.gif.model.Day
import team.gif.model.Histogram
import team.gif.model.User


@Service
class HistogramService(private val dayService: DayService) {

	val logger: Logger = LogManager.getLogger(HistogramService::class.java)


	fun computeHistograms(numDays: Int, minActiveDays: Int): LinkedList<Histogram> {
		val histograms = HashMap<String, Histogram>()
		val numActiveDays = HashMap<String, Int>() // Number of days each user was in call
		val days: List<Day> = this.dayService.getDays(1440).subList(1, numDays + 1) // Only get data for last X finished days (excludes today)

		// Add each interval to the respective user's histogram
		for (day in days) {

			// TODO: account for users being in two channels simultaneously
			for (channel: Channel in day.channels) {
				for (user: User in channel.users) {

					// Add intervals to user's histogram
					val histogram: Histogram = histograms.getOrDefault(user.id, Histogram(user.id))
					user.intervals.forEach(histogram::addInterval)

					// Increment number of active days for user by 1
					numActiveDays.merge(user.id, 1) { prev, _ -> prev + 1 }
				}
			}
		}

		// Remove users that weren't on for enough days
		for (entry in numActiveDays.entries) {
			if (entry.value < minActiveDays) {
				histograms.remove(entry.key)
			}
		}

		return LinkedList(histograms.values)
	}

}
