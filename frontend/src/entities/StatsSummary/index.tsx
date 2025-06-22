import styles from './styles/index.module.css';
import type { Props } from './types';
import { StatBox } from './ui/StatBox';
import { getStatList } from './ui/statList';

export function StatsSummary({ stats }: Props) {
    const statList = getStatList(stats);

    return (
        <div className={styles.container}>
            <div className={styles.grid}>
                {statList.map(({ label, value }, index) => (
                    <StatBox key={index} label={label} value={value} />
                ))}
            </div>
        </div>
    );
}
