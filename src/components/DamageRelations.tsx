/*eslint-disable*/
import React, {useEffect, useState} from "react";
import Type from "./Type.tsx";
import {DamageRelation} from "../types/FormattedPokemonData.ts";
import {DamageFromAndTo, SeperateDamages, Damage} from "../types/SeperateDamageRelations.ts";

interface DamageModalProps {
    damages: DamageRelation[];
}

interface Info {
    name: string;
    url: string;
}



const DamageRelations = ({ damages }) => {

    const [damagePokemonForm, setDamagePokemonForm] = useState<SeperateDamages>({})

    useEffect(() => {
        const arrDamage = damages.map(damage => seperateObjectBetweenToAndFrom(damage))

        if(arrDamage.length === 2) {
            const obj = joinDamageRelations(arrDamage)
            // console.log()
            setDamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from)))
            console.log(obj)
        }else {
            // console.log(JSON.stringify(postDamageValue(arrDamage[0].from)))
            setDamagePokemonForm(postDamageValue(arrDamage[0].from))
        }

    }, [])

    const joinDamageRelations = (props: DamageFromAndTo[]): DamageFromAndTo => {
        return {
            to: joinObjects(props, 'to'),
            from: joinObjects(props, 'from')
        }
    }

    const reduceDuplicateValues = (props: SeperateDamages) => {
        const duplicateValues = {
            double_damage: '4x',
            half_damage: '1/4x',
            no_damage: '0x'
        }

        return Object.entries(props).reduce((acc, [keyName, value]) => {
            const key = keyName as keyof typeof props;

            const verifiedValue = filterForUniqueValues(value, duplicateValues[key])

            return (acc = { [keyName] : verifiedValue, ...acc })
        })
    }

    const filterForUniqueValues = (valueForFiltering: Damage[], damageValue: string) => {
        // console.log(valueForFiltering, damageValue)

        const initalArray: Damage[] = []

        return valueForFiltering.reduce((acc, currentValue) => {
            const { url, name } = currentValue;
            console.log(url, name)

            const filterAcc = acc.filter(a => a.name !== name)

            return filterAcc.length === acc.length ? (acc = [currentValue, ...acc]) : (acc = [{damageValue : damageValue, name, url}, ...filterAcc])

        }, [])
    }

    const joinObjects = (props: DamageFromAndTo[], string: string) => {
        const key = string as keyof typeof props[0];
        const firstArrayValue = props[0][key]
        const secondArrayValue = props[1][key]

        const result = Object.entries(secondArrayValue).reduce((acc, [keyName, value]): [string, [Damage]] => {
            // console.log(acc, [keyName, value]: )

            const key = keyName as keyof typeof firstArrayValue;
            const result = firstArrayValue[key]?.concat(value);

            return (acc = { [keyName] : result, ...acc})
        }, {})

        // console.log(result)
        return result
    }

    const postDamageValue = (props: SeperateDamages): SeperateDamages => {
        return Object.entries(props).reduce((acc, [keyName, value]) => {

            const key = keyName as keyof typeof props;

            const valuesOfKeyName = {
                double_damage: '2x',
                half_damage: '1/2x',
                no_damage: '0x'
            }

            return (acc = {[keyName] : value.map((i: Info[]) => ({
                    damageValue: valuesOfKeyName[key],
                    ...i
                })),
                ...acc
            })
        }, {})
    }

    const seperateObjectBetweenToAndFrom = (damage: DamageRelation): DamageFromAndTo => {
        const from = filterDamageRelations('_from', damage)
        const to = filterDamageRelations('_to', damage)

        return { from , to }
    }

    const filterDamageRelations = (valueFilter: string, damage: DamageRelation) => {

        const result: SeperateDamages = Object.entries(damage).filter(([keyName, _]) => {
            return keyName.includes(valueFilter)
        }).reduce((acc, [keyName,value]): SeperateDamages => {

            // console.log(acc, [keyName, value])
            const keyWithValueFilterRemove = keyName.replace(valueFilter, '')
            return (acc = { [keyWithValueFilterRemove] : value, ...acc})

        }, {})

        return result
    }



    return (
        <div className='flex gap-2 flex-col'>
            {
                damagePokemonForm ? (
                    <>
                        {
                            Object.entries(damagePokemonForm).map(([keyName, value]: [string, Damage[]]) => {
                                const key = keyName as keyof typeof damagePokemonForm;
                                const valuesOfKeyName = {
                                    double_damage : 'Weak',
                                    half_damage: 'Registant',
                                    no_damage: 'Immune',
                                }

                                return (
                                    <div key={key}>
                                        <h3
                                            className='capitalize font-medium text-sm md:text-base text-slate-500 text-center'
                                        >{valuesOfKeyName[key]}</h3>
                                        <div className='flex flex-wrap gap-1 justify-center'>
                                            {
                                                value?.length > 0 ? (
                                                    value?.map(({name, url, damageValue}) => {
                                                        return (
                                                            <Type
                                                                type={name}
                                                                key={url}
                                                                damageValue={damageValue}
                                                            />
                                                        )
                                                    })
                                                ): (
                                                    <Type type={'none'} key={'none'} />
                                                )
                                            }
                                        </div>
                                    </div>

                                )
                            })
                        }

                    </>
                ): (
                    <div></div>
                )
            }
        </div>
    )
}

export default DamageRelations