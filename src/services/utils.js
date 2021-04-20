

export function getWindDirection(degrees){
  if((degrees >= 348.75 && degrees <= 360) || (degrees >=0 && degrees < 11.25)){return "⇧"}
  if(degrees >= 11.25 && degrees < 33.75){return "⬀"}
  if(degrees >= 33.75 && degrees < 56.25){return "⬀"}
  if(degrees >= 56.25 && degrees < 78.75){return "⬀"}
  if(degrees >= 78.75 && degrees < 101.25){return "⇨"}
  if(degrees >= 101.25 && degrees < 123.75){return "⬂"}
  if(degrees >= 123.75 && degrees < 146.25){return "⬂"}
  if(degrees >= 146.25 && degrees < 168.75){return "⬂"}
  if(degrees >= 168.75 && degrees < 191.25){return "⇩"}
  if(degrees >= 191.25 && degrees < 213.75){return "⬃"}
  if(degrees >= 213.75 && degrees < 236.25){return "⬃"}
  if(degrees >= 236.25 && degrees < 258.75){return "⬃"}
  if(degrees >= 258.75 && degrees < 281.25){return "⇦"}
  if(degrees >= 281.25 && degrees < 303.75){return "⬁"}
  if(degrees >= 303.75 && degrees < 326.25){return "⬁"}
  if(degrees >= 326.25 && degrees < 348.75){return "⬁"}
}

export function getTimeFromTimestamp(t){
  var dt = new Date(t*1000);
  var hr = dt.getHours();
  var m = "0" + dt.getMinutes();
  return hr+ ':' + m.substr(-2);  
}

// thanks Ben