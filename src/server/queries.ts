import "server-only"
import { db } from './db'

export async function getRecommendations() {
    const recos = await db.query.recommendations.findMany({
        with: {
            primaryCategory: true,
            secondaryCategory: true,
            user: true
        }
    })
    return recos;
}
