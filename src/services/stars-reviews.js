export function getStars(stars) {
  if (rating === 1) {
    return "⭐"
  } else if (rating === 2) {
    return "⭐⭐"
  } else if (rating === 3) {
    return "⭐⭐⭐"
  } else if (rating === 4) {
    return "⭐⭐⭐⭐"
  } else {
    return "⭐⭐⭐⭐⭐"
  }
}