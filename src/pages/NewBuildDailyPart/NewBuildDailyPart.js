import styled from "styled-components";
import { useEffect, useState } from "react";

function Mod({index, mods, modName, removeMod}){

    const [mod, setMod] = useState(modName);

    useEffect(() => {
        setMod(modName);
    }, [modName]);

    function remove(){
        removeMod(index);
    }

    function handleChange(e){
        setMod(e.target.value);
        mods[index].name = e.target.value;
    }

    return (
        <>
            <input type="text" required placeholder="M.O.D." value={mod} onChange={(e)=> handleChange(e)} />
            <button onClick={remove}>X</button>
        </>
    )
}

function Moi({index, mois, moiName, removeMoi}){

    const [moi, setMoi] = useState(moiName);

    useEffect(() => {
        setMoi(moiName);
    }, [moiName]);

    function remove(){
        removeMoi(index);
    }

    function handleChange(e){
        setMoi(e.target.value);
        mois[index].name = e.target.value;
    }

    return (
        <>
            <input type="text" required placeholder="M.O.I." value={moi} onChange={(e)=> handleChange(e)} />
            <button onClick={remove}>X</button>
        </>
    )
}

function Equipment({index, equipments, equipmentName, removeEquipment}){

    const [equipment, setEquipment] = useState(equipmentName);

    useEffect(() => {
        setEquipment(equipmentName);
    }, [equipmentName]);

    function remove(){
        removeEquipment(index);
    }

    function handleChange(e){
        setEquipment(e.target.value);
        equipments[index].name = e.target.value;
    }

    return (
        <>
            <input type="text" required placeholder="Equipamento" value={equipment} onChange={(e)=> handleChange(e)} />
            <button onClick={remove}>X</button>
        </>
    )
}

export default function NewBuildDailyPart(){

    const [date, setDate] = useState("");
    const [build, setBuild] = useState("");
    const [climate, setClimate] = useState("");
    const [numberDays, setNumberDays] = useState("");
    const [remainingDays, setRemainingDays] = useState("");
    const [mods, setMods] = useState([{name: ""}]);
    const [mois, setMois] = useState([{name: ""}]);
    const [equipments, setEquipments] = useState([{name: ""}]);
    const [buildDailyOccurrences, setBuildDailyOccurrences] = useState([{description: ""}]);

    function addMod(){
        let modArray = [...mods];
        modArray.push({name: ""});
        setMods(modArray);
    }

    function removeMod(index){
        setMods(mods.filter((mod, i) => i !== index));
    }

    function addMoi(){
        let moiArray = [...mois];
        moiArray.push({name: ""});
        setMois(moiArray);
    }

    function removemoi(index){
        setMois(mois.filter((moi, i) => i !== index));
    }

    function addEquipment(){
        let equipmentArray = [...equipments];
        equipmentArray.push({name: ""});
        setEquipments(equipmentArray);
    }

    function removeEquipment(index){
        setEquipments(equipments.filter((equipment, i) => i !== index));
    }

    function addbuildDailyOccurrence(){
        let buildDailyOccurrenceArray = [...buildDailyOccurrences];
        buildDailyOccurrenceArray.push({name: ""});
        setBuildDailyOccurrences(buildDailyOccurrenceArray);
    }

    function removebuildDailyOccurrence(index){
        setBuildDailyOccurrences(buildDailyOccurrences.filter((buildDailyOccurrence, i) => i !== index));
    }

    return (
        <Container>

            <Title>Novo diário de obra</Title>

            <form>

                <Type>
                    Infos do dia:
                </Type>

                <input type="date" required value={date} onChange={(e)=> setDate(e.target.value)} />
                <input type="text" required placeholder="Obra" value={build} onChange={(e)=> setBuild(e.target.value)} />
                <input type="text" required placeholder="Tempo" value={climate} onChange={(e)=> setClimate(e.target.value)} /> {/* Depois alterar para checkbox */}
                <input type="number" min={0} required placeholder="Dias corridos" value={numberDays} onChange={(e)=> setNumberDays(e.target.value)} />
                <input type="number" min={0} required placeholder="Dias restantes" value={remainingDays} onChange={(e)=> setRemainingDays(e.target.value)} />

                <Type>
                    Efetivo:
                </Type>

                <Type>
                    M.O.D.:
                </Type>

                {mods.map((mod, index)=> <Mod modName={mod.name} key={index} index={index} removeMod={removeMod} mods={mods} />)}

                <button type="add" onClick={addMod}>+</button>

                <Type>
                    M.O.I.:
                </Type>

                {mois.map((moi, index)=> <Moi moiName={moi.name} key={index} index={index} removeMoi={removemoi} mois={mois} />)}

                <button type="add" onClick={addMoi}>+</button>

                <Type>
                    Equipamento:
                </Type>

                {equipments.map((equipment, index)=> <Equipment equipmentName={equipment.name} key={index} index={index} removeEquipment={removeEquipment} equipments={equipments} />)}

                <button type="add" onClick={addEquipment}>+</button>

            </form>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    * {
        margin: 5px;
    }
    form {
        input {
            border: none;
            background: lightgray;
            border-radius: 5px;
            height: 58px;
            padding-top: 18px;
            padding-bottom: 17px;
            padding-left: 15px;
            font-weight: 400;
            font-size: 20px;
            line-height: 23px;
            color: #000000;
            outline: none;
        }
    }
`;

const Type = styled.div`
    margin-top: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
`;

const Title = styled.h1`
    margin-top: 20px;
    margin-bottom: 20px;
    font-size: 30px;
    font-weight: 700;
    color: #000000;
`;