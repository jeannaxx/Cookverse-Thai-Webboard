import { leaderboard, PASS_LINE } from '../data/mock.js';

const PODIUM_SIZE = 5;
// ลำดับการวางบนแท่น: 4 2 1 3 5 (อันดับ 1 อยู่ตรงกลาง)
const PODIUM_ORDER = [3, 1, 0, 2, 4];

const fmtTime = (sec) => `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')} นาที`;

// คะแนนมากก่อน ถ้าเท่ากันใช้เวลาน้อยกว่า
const ranked = [...leaderboard]
  .sort((a, b) => b.best - a.best || a.bestTime - b.bestTime)
  .map((p, i) => ({ ...p, rank: i + 1 }));

export default function Leaderboard() {
  const podium = PODIUM_ORDER.map((i) => ranked[i]).filter(Boolean);
  const rest = ranked.slice(PODIUM_SIZE);

  return (
    <>
      <header className="page-head">
        <div className="title-block">
          <div className="title-row">
            <h1>อันดับผู้เล่น</h1>
            <span className="tag">ข้อมูลตัวอย่าง</span>
          </div>
          <p className="muted">จัดอันดับจากคะแนนที่ดีที่สุดของแต่ละคน ถ้าคะแนนเท่ากัน คนที่ใช้เวลาน้อยกว่าอยู่อันดับสูงกว่า</p>
        </div>
      </header>

      <section className="card podium-card" aria-label="5 อันดับแรก">
        <ol className="podium">
          {podium.map((p) => (
            <li key={p.player} className={`podium-col rank-${p.rank}`}>
              <div className="podium-person">
                <div className="podium-avatar" aria-hidden="true">{p.player.slice(-1)}</div>
                <div className="podium-name">{p.player}</div>
                <div className="podium-score num">{p.best}</div>
                <div className="small muted nowrap">{fmtTime(p.bestTime)}</div>
              </div>
              <div className="podium-step">
                <span className="podium-rank num">
                  <span className="sr-only">อันดับ </span>{p.rank}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {rest.length > 0 && (
        <section className="card">
          <h2>อันดับที่ {PODIUM_SIZE + 1} เป็นต้นไป</h2>
          <div className="table-wrap">
            <table style={{ minWidth: 480 }}>
              <thead>
                <tr>
                  <th scope="col">อันดับ</th>
                  <th scope="col">ผู้เล่น</th>
                  <th scope="col" className="right">คะแนนดีที่สุด</th>
                  <th scope="col" className="right">เวลา</th>
                  <th scope="col" className="right">จำนวนรอบ</th>
                </tr>
              </thead>
              <tbody>
                {rest.map((p) => (
                  <tr key={p.player}>
                    <td className="num muted">{p.rank}</td>
                    <td className="strong">{p.player}</td>
                    <td className={'num right' + (p.best < PASS_LINE ? ' low' : '')}>{p.best}</td>
                    <td className="muted right nowrap">{fmtTime(p.bestTime)}</td>
                    <td className="muted right">{p.rounds}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}
