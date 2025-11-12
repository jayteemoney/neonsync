import Phaser from 'phaser';

export class NeonArenaGame extends Phaser.Scene {
  private score: number = 0;
  private scoreText!: Phaser.GameObjects.Text;
  private player!: Phaser.GameObjects.Rectangle;
  private particles!: Phaser.GameObjects.Particles.ParticleEmitter;
  private onScoreCallback?: (score: number) => void;

  constructor() {
    super({ key: 'NeonArenaGame' });
  }

  init(data: { onScore?: (score: number) => void }) {
    this.onScoreCallback = data.onScore;
    this.score = 0;
  }

  create() {
    const { width, height } = this.cameras.main;

    this.cameras.main.setBackgroundColor('#0a0a1a');

    this.add.grid(width / 2, height / 2, width, height, 50, 50, 0x00f0ff, 0, 0x00f0ff, 0.1);

    this.player = this.add.rectangle(width / 2, height / 2, 40, 40, 0x00f0ff);
    this.player.setStrokeStyle(2, 0xff00ff);

    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff);
    graphics.fillCircle(4, 4, 4);
    graphics.generateTexture('particle', 8, 8);
    graphics.destroy();

    this.particles = this.add.particles(0, 0, 'particle', {
      speed: { min: -100, max: 100 },
      angle: { min: 0, max: 360 },
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
      lifespan: 600,
      gravityY: 0,
      quantity: 10,
      tint: [0x00f0ff, 0xff00ff, 0x00ff00],
      emitting: false,
    });

    this.scoreText = this.add.text(20, 20, 'Score: 0', {
      font: '28px monospace',
      color: '#00f0ff',
    });

    this.add.text(width / 2, height - 40, 'Press SPACE to score +100', {
      font: '18px monospace',
      color: '#ff00ff',
    }).setOrigin(0.5);

    this.input.keyboard?.on('keydown-SPACE', this.handleAction, this);

    this.tweens.add({
      targets: this.player,
      scaleX: 1.1,
      scaleY: 1.1,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });
  }

  private handleAction() {
    this.score += 100;
    this.scoreText.setText(`Score: ${this.score}`);

    this.particles.setPosition(this.player.x, this.player.y);
    this.particles.explode(20);

    this.cameras.main.shake(100, 0.005);

    this.tweens.add({
      targets: this.scoreText,
      scale: 1.2,
      duration: 100,
      yoyo: true,
    });

    if (this.onScoreCallback) {
      this.onScoreCallback(100);
    }
  }

  update() {
    const cursors = this.input.keyboard?.createCursorKeys();
    if (!cursors) return;

    const speed = 5;

    if (cursors.left.isDown) {
      this.player.x = Math.max(20, this.player.x - speed);
    } else if (cursors.right.isDown) {
      this.player.x = Math.min(this.cameras.main.width - 20, this.player.x + speed);
    }

    if (cursors.up.isDown) {
      this.player.y = Math.max(20, this.player.y - speed);
    } else if (cursors.down.isDown) {
      this.player.y = Math.min(this.cameras.main.height - 20, this.player.y + speed);
    }
  }
}
