import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { prisma } from '../../db'

export const ffRouter = createTRPCRouter({
    getCharacters: publicProcedure.query(async () => {
        const data = await prisma.character.findMany()
        return data
    }),
    getCharactersByVote: publicProcedure.query(async ()=> {
        const data = await prisma.character.findMany({
            orderBy: {
                votes: "desc",
            },
        })
        return data
    }),
    incrementCharacterVote: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({input})=> {
        await prisma.character.update({
            where: {
                id: input.id,
            },
            data: {
                votes: {increment: 1}
            }
        })
        return {
            id: input.id,
        }
    }),
    incrementGamesVote: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({input})=> {
        await prisma.game.update({
            where: {
                id: input.id,
            },
            data: {
                votes: {increment: 1}
            }
        })
    }),
    getGames: publicProcedure.query(async ()=> {
        const data = await prisma.game.findMany()
        return data
    }),
    getGamesByVote: publicProcedure.query(async ()=> {
        const data = await prisma.game.findMany({
            orderBy: {
                votes: "desc",
            },
        })
        return data
    }),
    getTopCharacters: publicProcedure.query(async ()=> {
        const data = await prisma.character.findMany({
            orderBy: {
                votes: "desc",
            },
            take:10
        })
        return data
    }),
    getTopGames: publicProcedure.query(async ()=> {
        const data = await prisma.game.findMany({
            orderBy: {
                votes: "desc",
            },
            take:5
        })
        return data
    }),
    getCharacter: publicProcedure.input(z.object({ name: z.string() })).query(async ({ input })=> {
        const data = await prisma.character.findMany({
            where: {
                name: {
                    startsWith:input.name,
                    mode: 'insensitive'
                },
            }
        })
        return data
    })
})