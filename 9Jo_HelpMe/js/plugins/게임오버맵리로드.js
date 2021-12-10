/*:
 * @plugindesc v1.01 게임 오버 후 마지막으로 저장한 게임을 로드합니다.
 * @author Torqus
 * @help
 * CHANGELOG
 * 1.01 - 이제 플레이어는 Ok 또는 Cancel 키를 사용하여 계속할지 또는 제목으로 이동할지 결정할 수 있습니다.
 *
 * Gameover 후 마지막 저장 로드
 *
 * 이 플러그인은 누구나 이해할 수 있을 만큼 간단합니다. ,
 * GameOver 장면이 작동하는 방식을 수정 합니다.
 *
 * 원래 당신이 졌을 때 당신이 타이틀 화면으로 보내질 때, 나는
 * 그것이 당신이 당신의 게임에 대해 정말로 원하는 것이 아니라고 생각 합니다, 나는 내 플레이어들이
 * 계속 플레이하기를 원합니다 , 그래서 나는 그들이 저장을 다시 로드하는 분노를 저장하겠습니다 파일.
 *
 * 이것이 바로 이 플러그인이 하는 일입니다. 플레이어가 마지막으로 저장한 파일을 로드합니다.
 * 파일 99 또는 가장 고급 파일이 아니라 마지막으로 세이브한 파일만 로드합니다 .
 * 그래서 게임이 끝나기 전에 플레이하던 게임을 계속 플레이합니다.
 * 그리고 저장한 게임이 없으면
 이전과 같이 타이틀 화면으로 * 이동합니다.
 *
 * 또한 엔터를 누르면 저장이 로드되지만 취소 버튼을 누르면
 * 타이틀 화면으로 이동합니다.
 *
 * 크레딧이 필요하지 않습니다. 이것은 누구나 만들 수 있는 매우 짧은 플러그인입니다.
 */


Scene_Gameover.prototype.update = function() {
    if (this.isActive() && !this.isBusy() && this.isTriggered()) {
        this.loadgame();
    }
    if (this.isActive() && !this.isBusy() && this.isBackTriggered()) {
        this.gotoTitle();
    }
    Scene_Base.prototype.update.call(this);
};


Scene_Gameover.prototype.isTriggered = function() {
    return Input.isTriggered('ok') || TouchInput.isTriggered();
};
Scene_Gameover.prototype.isBackTriggered = function() {
    return Input.isRepeated('Cancel') || TouchInput.isCancelled();
};


Scene_Gameover.prototype.loadgame = function() {
    this.fadeOutAll();
    if(DataManager.isAnySavefileExists()){
        DataManager.loadGame(DataManager.latestSavefileId());
        this.reloadMapIfUpdated();
        $gameSystem.onAfterLoad();
        SceneManager.goto(Scene_Map);
    }
    else{
        SceneManager.goto(Scene_Title);
    }
};


Scene_Gameover.prototype.gotoTitle = function() {
    this.fadeOutAll();
    SceneManager.goto(Scene_Title);
};


Scene_Gameover.prototype.reloadMapIfUpdated = function() {
    $gamePlayer.reserveTransfer($gameMap.mapId(), $gamePlayer.x, $gamePlayer.y);
    $gamePlayer.requestMapReload();
};