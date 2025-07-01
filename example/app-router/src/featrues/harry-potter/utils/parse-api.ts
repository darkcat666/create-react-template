import { createResult, Result } from "@/utils/result";
import { APIRes } from "../model/model-view";
import { APIView } from "../model/model-res";
import { createOption } from "@/utils/option";

export function perseApi(api: APIRes): Result<Array<APIView>, Error> {
    const filterList: Array<APIView> = api
        .filter((item) => item.image !== "")
        .map((item) => {
            const {
                alternate_names,
                alternate_actors,
                dateOfBirth,
                yearOfBirth,
                wand,
                ...rest
            } = item;

            const value: APIView = {
                ...rest,
                alternateNames: alternate_names,
                alternateActors: alternate_actors,
                dateOfBirth:
                    dateOfBirth === null
                        ? createOption.none()
                        : createOption.some(dateOfBirth),
                yearOfBirth:
                    yearOfBirth === null
                        ? createOption.none()
                        : createOption.some(yearOfBirth),
                wand: {
                    wood: wand.wood,
                    core: wand.core,
                    length:
                        wand.length == null
                            ? createOption.none()
                            : createOption.some(wand.length)
                }
            };

            return value;
        });

    return createResult.ok<Array<APIView>>(filterList);
}
