//=============================================================================
// RPG Maker MZ - Alternative Menu Screen
//=============================================================================

/*:
 * @target MZ
 * @plugindesc Alternative menu screen layout.
 * @author Yoji Ojima
 *
 * @help AltMenuScreen.js
 *
 * This plugin changes the layout of the menu screen.
 * It puts the commands on the top and the status on the bottom.
 *
 * It does not provide plugin commands.
 */

/*:ja
 * @target MZ
 * @plugindesc メニュー画面のレイアウトを変更します。
 * @author Yoji Ojima
 *
 * @help AltMenuScreen.js
 *
 * このプラグインは、メニュー画面のレイアウトを変更します。
 * コマンドを上側に、ステータスを下側に配置します。
 *
 * プラグインコマンドはありません。
 */

(function() {

Scene_Boot.prototype.startNormalGame = function() {
    this.checkPlayerLocation();
    DataManager.setupNewGame();
    SceneManager.goto(Scene_Map);
    //Window_TitleCommand.initCommandPosition();
};
//게임 종료시 타이틀가는것 방지
    Scene_GameEnd.prototype.commandToTitle = function() {
    this.fadeOutAll();
    SceneManager.exit();
   };
})();