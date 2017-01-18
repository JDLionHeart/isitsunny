# A function to tell you which episode(s) of Always Sunny start(s) closest to your current time or an input time

# Manually input times must be in the format "%l:$M %p" e.g. "3:14 PM"
# Similarly, day input is the name of the day e.g. "Friday"

#Enjoy!

WhenisitSunny <- function(time=trunc(Sys.time(), "mins"), day=strftime(Sys.time(), format="%A")){
      
      # If time was input manually, convert it to POSIXlt 
      if(class(time)[1] == "character"){
            time <- as.POSIXlt(time, format="%l:%M %p")
      }
      
      # Days of the week for later reference
      wds <- c("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday")
      
      # Print obvious answer
      cat("\nIt is Always Sunny\n\n")
      
      # Save original directory and set new one
      mainDir <- getwd()
      setwd("/Users/Jonathan/R/Always Sunny")
      
      # Read in data, remove lines without day data, and convert times
      data <- read.csv("Data.csv")
      data <- data[data$Day!="",]
      data$Time <- as.POSIXlt(strptime(data$Time, format="%H:%M"))
      
      
      # Make a new column of day values from day
      data$DayVal <- match(data$Day, wds) - 1 # - 1 because Sunday needs to be 0 for POSIX data
      
      #Set the weekday to input, in case it was input manually
      time$wday <- match(day, wds) - 1
      
      # Print input/current time
      cat(paste("Time:", strftime(time, format="%l:%M %p"), "on a", weekdays(time), "\n\n"))
      
      # Black magic. I wrote this too long ago to remember why it works, but it looks just awful.
      for(i in 1:nrow(data)){
            if(time$wday <= data$DayVal[i]){
                  mintime <- as.POSIXlt(time)
                  maxtime <- as.POSIXlt(time)
                  mintime$hour <- data$Time[i]$hour
                  maxtime$hour <- data$Time[i]$hour
                  mintime$min <- data$Time[i]$min
                  maxtime$min <- data$Time[i]$min
                  mintime$sec <- 0
                  maxtime$sec <- 0
                  mintime <- as.POSIXct(mintime)
                  maxtime <- as.POSIXct(maxtime)
                  mintime <- mintime - 3600*24*(7 - (data$DayVal[i] - time$wday))
                  data$mintime[i] <- mintime
                  maxtime <- maxtime + 3600*24*(data$DayVal[i] - time$wday)
                  data$maxtime[i] <- maxtime
            }
            if(time$wday > data$DayVal[i]){
                  mintime <- as.POSIXlt(time)
                  maxtime <- as.POSIXlt(time)
                  mintime$hour <- data$Time[i]$hour
                  maxtime$hour <- data$Time[i]$hour
                  mintime$min <- data$Time[i]$min
                  maxtime$min <- data$Time[i]$min
                  mintime$sec <- 0
                  maxtime$sec <- 0
                  mintime <- as.POSIXct(mintime)
                  maxtime <- as.POSIXct(maxtime)
                  mintime <- mintime - 3600*24*(time$wday - data$DayVal[i])
                  data$mintime[i] <- mintime
                  maxtime <- maxtime + 3600*24*(7-(time$wday - data$DayVal[i]))
                  data$maxtime[i] <- maxtime
            }
      }
      data$mintime <- as.numeric(data$mintime)
      data$maxtime <- as.numeric(data$maxtime)
      time <- as.numeric(time)
      
      # find absolute time differences ahead of and behind weekday
      # take the minimum of these and use it as the difference
      for(i in 1:nrow(data)){
            minimum <- abs(time - data$mintime[i])
            maximum <- abs(data$maxtime[i] - time)
            data$diff[i] <- min(minimum, maximum)
      }
      
      # Pull out episode(s) with the lowest difference between times
      closest <- min(data$diff)
      ep <- data[data$diff == closest, 2:6]
      
      # Print out the info for said episode(s)
      cat("Closest Episode(s):\n\n")
      
      for(i in 1:nrow(ep)){
            cat(paste("Season ", ep[i, 1], " Episode ", ep[i, 2], ": ", unlist(ep[i, 3]), " | ", strftime(ep[i, 4], format="%l:%M %p"), " on a ", ep[i, 5], "\n", sep=""))
      }
      
      # Reset original directory
      setwd(mainDir)
}