/**
 * @param {ReturnType<import('./ui').ui>} ui 
 * @param {ReturnType<timer>} timer 
 */
export function app(ui, timer) {
  
  ui.setTime(timer.seconds);

  timer.onTick((time) => {
    ui.setTime(time);
  });

  ui.onStart(() => timer.start());
  // ui.onStop(() => timer.stop());
}
