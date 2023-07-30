/*eslint-disable*/
import {useEffect, useState} from "react";

const DamageRelations = ({ damages }) => {

    const [damagePokemonForm, setDamagePokemonForm] = useState()

    useEffect(() => {
        const arrDamage = damages.map(damage => seperateObjectBetweenToAndFrom(damage))

        if(arrDamage.length === 2) {
            const obj = joinDamageRelations(arrDamage)
            // console.log()
            setDamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from)))
            console.log(obj)
        }else {
            setDamagePokemonForm(postDamageValue(arrDamage[0].from))
        }

    }, [])

    const joinDamageRelations = (props) => {
        return {
            to: joinObjects(props, 'to'),
            from: joinObjects(props, 'from')
        }
    }

    const reduceDuplicateValues = (props) => {
        const duplicateValues = {
            double_damage: '4x',
            half_damage: '1/4x',
            no_damage: '0x'
        }

        return Object.entries(props).reduce((acc, [keyName, value]) => {
            const key = keyName;

            const verifiedValue = filterForUniqueValues(value, duplicateValues[key])

            return (acc = { [keyName] : verifiedValue, ...acc })
        })
    }

    const filterForUniqueValues = (valueForFiltering, damageValue) => {
        console.log(valueForFiltering, damageValue)

        return valueForFiltering.reduce((acc, currentValue) => {
            const { url, name } = currentValue;
            console.log(url, name)

            const filterAcc = acc.filter(a => a.name !== name)

            return filterAcc.length === acc.length ? (acc = [currentValue, ...acc]) : (acc = [{damageValue : damageValue, name, url}, ...filterAcc])

        }, [])
    }

    const joinObjects = (props, string) => {
        const key = string;
        const firstArrayValue = props[0][key]
        const secondArrayValue = props[1][key]

        const result = Object.entries(secondArrayValue).reduce((acc, [keyName, value]) => {
            console.log(acc, [keyName, value])

            const result = firstArrayValue[keyName].concat(value)

            return (acc = { [keyName] : result, ...acc})
        }, {})

        // console.log(result)
        return result
    }

    const postDamageValue = (props) => {
        return Object.entries(props).reduce((acc, [keyName, value]) => {

            const key = keyName;

            const valuesOfKeyName = {
                double_damage: '2x',
                half_damage: '1/2x',
                no_damage: '0x'
            }

            return (acc = {[keyName] : value.map(i => ({
                    damageValue: valuesOfKeyName[key],
                    ...i
                })),
                ...acc
            })
        }, {})
    }

    const seperateObjectBetweenToAndFrom = (damage) => {
        const from = filterDamageRelations('_from', damage)
        const to = filterDamageRelations('_to', damage)

        return { from , to }
    }

    const filterDamageRelations = (valueFilter, damage) => {

        const result = Object.entries(damage).filter(([keyName, value]) => {
            return keyName.includes(valueFilter)
        }).reduce((acc, [keyName,value]) => {

            // console.log(acc, [keyName, value])
            const keyWithValueFilterRemove = keyName.replace(valueFilter, '')
            return (acc = { [keyWithValueFilterRemove] : value, ...acc})

        }, {})

        return result
    }



    return (
        <div></div>
    )
}

export default DamageRelations