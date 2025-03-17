const player1 =
{
    nome: "Mario",
    velocidade: 4,
    manobrabilidade: 3,
    poder: 4,
    pontos: 0
}


const player2 =
{
    nome: "Luigi",
    velocidade: 3,
    manobrabilidade: 4,
    poder: 3,
    pontos: 0
}


async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "reta"
            break;
        case random < 0.66:
            result = "curva"
            break;
        default:
            result = "combate"
            break;
    }

    return result
}

async function logRollResult(charName, block, dice, attribute) {
    console.log(`${charName} 🎲 rolou um dado de ${block} ${dice} + ${attribute} = ${dice + attribute}`)
}

async function punitionResult(){
    let punitionNum = Math.round((Math.random()) * 10) 
    return punitionNum % 2
}

async function playRaceEngine(char1, char2) {
    for (r = 1; r <= 5; r++) {
        console.log(`🏁 round ${r}`)

        // sorteador de bloco
        // no meu fazer com arrow function
        let block = await getRandomBlock()
        console.log(`bloco: ${block}`)

        // rolagem de dados
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        //teste de habilidade
        let testSkill1 = 0;
        let testSkill2 = 0;

        if (block == "reta") {
            testSkill1 = diceResult1 + char1.velocidade
            testSkill2 = diceResult1 + char2.velocidade

            await logRollResult(char1.nome, "velocidade", diceResult1, char1.velocidade)
            await logRollResult(char2.nome, "velocidade", diceResult2, char2.velocidade)

        } else if (block == "curva") {
            testSkill1 = diceResult1 + char1.manobrabilidade
            testSkill2 = diceResult1 + char2.manobrabilidade

            await logRollResult(char1.nome, "manobrabilidade", diceResult1, char1.manobrabilidade)
            await logRollResult(char2.nome, "manobrabilidade", diceResult1, char2.manobrabilidade)
        } else {
            let powerResult1 = diceResult1 + char1.poder
            let powerResult2 = diceResult1 + char2.poder

            console.log(`${char1.nome} lutou contra ${char2.nome}`)

            await logRollResult(char1.nome, "poder", diceResult1, char1.poder)
            await logRollResult(char2.nome, "poder", diceResult1, char2.poder)

            let punResult = await punitionResult()

            if(powerResult2 > powerResult1 && char1.pontos > 0){
                
                if(punResult){
                    console.log(`${char1.nome} foi atingido por uma bomba e perdeu o combate (-2)`)
                    char1.pontos =- 2    
                }else{
                    console.log(`${char1.nome} foi atingido por um casco perdeu o combate (-1)`)
                    char1.pontos --  
                }

            }
            else if(powerResult1 > powerResult2 && char2.pontos > 0){

                if(punResult){
                    console.log(`${char2.nome} foi atingido por uma bomba perdeu o combate (-2)`)
                    char2.pontos =- 2    
                }else{
                    console.log(`${char2.nome} foi atingido por um casco perdeu o combate (-1)`)
                    char2.pontos --  
                }
            }else{
                console.log("não houve vencedor")
            }
            
           console.log(powerResult1 === powerResult2 ? "combate empatado, nenhum ponto perdido" : "")

        }

        if(testSkill1 > testSkill2){
            console.log(`${char1.nome} marcou um ponto`)
            char1.pontos++
        }else if(testSkill2 > testSkill1){
            console.log(`${char2.nome} marcou um ponto`)
            char2.pontos++   
        }

        console.log("---------------------")
    }


}

async function declareWinner(char1, char2) {
    console.log("Resultado final:")
    console.log(`${char1.nome}: ${char1.pontos} x ${char2.nome}: ${char2.pontos}`)

    if(char1.pontos > char2.pontos){
        console.log(`${char1.nome} venceu a corrida!!!`)
    }else if(char2.pontos > char1.pontos){
        console.log(`${char2.nome} venceu a corrida!!!`)
    }else{
        console.log(`Houve um empate`)
    }
}
(async function main() {
    console.log(`🏁 corrida entre ${player1.nome} e ${player2.nome}`)

    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2)
})()