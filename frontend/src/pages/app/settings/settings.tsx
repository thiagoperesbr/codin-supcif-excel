/* eslint-disable no-useless-return */
import { Mail, Trash2, UploadCloud, User } from 'lucide-react'
import { ChangeEvent, useMemo, useState } from 'react'
import { CircleFlag } from 'react-circle-flags'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatBytes } from '@/utils/format-bytes'

import { SettingsTabs } from './settings-tabs'

export function Settings() {
  const [filesPhoto, setFilesPhoto] = useState<File[]>([])
  const [filesProjects, setFilesProjects] = useState<File[]>([])

  const previewURL = useMemo(() => {
    if (filesPhoto.length === 0) {
      return null
    }

    return URL.createObjectURL(filesPhoto[0])
  }, [filesPhoto])

  function handleFilesPhotoSelected(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return
    }

    const filesPhotos = Array.from(event.target.files)

    setFilesPhoto(filesPhotos)
  }

  function handleFilesProjectsSelected(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return
    }

    const filesProjects = Array.from(event.target.files)

    setFilesProjects(filesProjects)
  }

  return (
    <>
      <Helmet title="Settings" />
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>

        <SettingsTabs />

        <div className="flex flex-col">
          <div className="flex items-center justify-between border-b pb-5">
            <div className="spacee-y-1">
              <h2 className="text-lg font-medium">Informações Pessoais</h2>
              <span className="text-sm text-muted-foreground">
                Atualize sua foto e dados pessoas aqui
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Cancelar
              </Button>
              <Button variant="default" size="sm" type="submit" form="settings">
                Salvar
              </Button>
            </div>
          </div>
        </div>

        <form id="settings" className="flex flex-col w-full gap-5 divide-y">
          <div className="grid gap-5 grid-cols-formSettings">
            <Label htmlFor="firstName" className="text-sm font-medium">
              Nome
            </Label>
            <div className="grid gap-6 grid-cols-2">
              <Input id="firstName" placeholder="Nome" />
              <Input placeholder="Sobrenome" />
            </div>
          </div>

          <div className="grid gap-5 grid-cols-formSettings pt-5">
            <Label htmlFor="email" className="text-sm font-medium">
              Endereço de email
            </Label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input id="email" type="email" className="pl-10" />
            </div>
          </div>

          <div className="grid gap-5 grid-cols-formSettings pt-5">
            <Label htmlFor="photo" className="text-sm font-medium">
              Sua foto
              <span className="text-sm font-normal text-muted-foreground mt-0.5 block">
                Isso será exibido no seu perfil.
              </span>
            </Label>

            <div className="flex items-start gap-5">
              {previewURL === null ? (
                <div className="bg-secondary flex h-16 w-16 items-center justify-center rounded-full">
                  <User className="w-8 h-8" />
                </div>
              ) : (
                <img
                  src={previewURL}
                  alt=""
                  className="h-16 w-16 rounded-full object-cover"
                />
              )}

              <label
                htmlFor="photo"
                className=" group flex-1 cursor-pointer flex flex-col items-center gap-3 rounded-lg border px-6 py-4 text-center shadow-sm hover:bg-secondary/40 hover:border-secondary-foreground/20"
              >
                <div className="rounded-full border-6 bg-zinc-300 border-zinc-200/40 p-2">
                  <UploadCloud className="h-5 w-5 text-zinc-600" />
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm">
                    <span className="font-semibold text-primary">
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </span>
                  <span className="text-xs text-muted-foreground">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </span>
                </div>
              </label>
              <Input
                type="file"
                className="hidden"
                id="photo"
                onChange={handleFilesPhotoSelected}
              />
            </div>
          </div>

          <div className="grid gap-5 grid-cols-formSettings pt-5">
            <Label htmlFor="role" className="text-sm font-medium">
              Cargo
            </Label>
            <div>
              <Input id="role" />
            </div>
          </div>

          <div className="grid gap-5 grid-cols-formSettings pt-5">
            <Label htmlFor="country" className="text-sm font-medium">
              País
            </Label>
            <Select>
              <SelectTrigger className="flex h-11 w-full items-center rounded-lg border px-3 py-2 shadow-sm text-muted-foreground">
                <SelectValue placeholder="Selecione um país..." />
              </SelectTrigger>
              <SelectContent side="bottom" position="popper">
                <SelectItem value="ar">
                  <div className="flex items-center gap-2">
                    <CircleFlag countryCode="ar" height={16} width={16} />
                    <span className="font-medium">Argentina</span>
                  </div>
                </SelectItem>
                <SelectItem value="br">
                  <div className="flex items-center gap-2">
                    <CircleFlag countryCode="br" height={16} width={16} />
                    <span className="font-medium">Brasil</span>
                  </div>
                </SelectItem>
                <SelectItem value="ca">
                  <div className="flex items-center gap-2">
                    <CircleFlag countryCode="ca" height={16} width={16} />
                    <span className="font-medium">Canada</span>
                  </div>
                </SelectItem>
                <SelectItem value="us">
                  <div className="flex items-center gap-2">
                    <CircleFlag countryCode="us" height={16} width={16} />
                    <span className="font-medium">
                      Estados Unidos da América
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="fr">
                  <div className="flex items-center gap-2">
                    <CircleFlag countryCode="fr" height={16} width={16} />
                    <span className="font-medium">França</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-5 grid-cols-formSettings pt-5">
            <Label htmlFor="timezone" className="text-sm font-medium">
              Fuso horário
            </Label>
            <Select>
              <SelectTrigger className="flex h-11 w-full items-center rounded-lg border px-3 py-2 shadow-sm text-muted-foreground">
                <SelectValue placeholder="Selecione um fuso horário..." />
              </SelectTrigger>
              <SelectContent side="bottom" position="popper">
                <SelectItem value="ar">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">América - Los Angeles</span>
                    <span className="font-medium text-muted-foreground">
                      (UTC-07:00)
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="br">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">América - Chicago</span>
                    <span className="font-medium text-muted-foreground">
                      (UTC-05:00)
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="ca">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">América - São Paulo</span>
                    <span className="font-medium text-muted-foreground">
                      (UTC-03:00)
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="ca">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Europa - Londres</span>
                    <span className="font-medium text-muted-foreground">
                      (UTC+01:00)
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="ca">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Europa - Paris</span>
                    <span className="font-medium text-muted-foreground">
                      (UTC+02:00)
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="ca">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Asia - Dubai</span>
                    <span className="font-medium text-muted-foreground">
                      (UTC+04:00)
                    </span>
                  </div>
                </SelectItem>
                <SelectItem value="ca">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Asia - Tóquio</span>
                    <span className="font-medium text-muted-foreground">
                      (UTC+09:00)
                    </span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-5 grid-cols-formSettings pt-5">
            <Label htmlFor="projects" className="text-sm font-medium">
              Projetos de portfólio
              <span className="text-sm font-normal text-muted-foreground mt-0.5 block">
                Compartilhe alguns trechos do seu trabalho.
              </span>
            </Label>

            <div>
              <label
                htmlFor="projects"
                className=" group flex-1 cursor-pointer flex flex-col items-center gap-3 rounded-lg border px-6 py-4 text-center shadow-sm hover:bg-secondary/40 hover:border-secondary-foreground/20"
              >
                <div className="rounded-full border-6 bg-zinc-300 border-zinc-200/40 p-2">
                  <UploadCloud className="h-5 w-5 text-zinc-600" />
                </div>

                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm">
                    <span className="font-semibold text-primary">
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </span>
                  <span className="text-xs text-muted-foreground">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </span>
                </div>
              </label>

              <Input
                type="file"
                className="hidden"
                id="projects"
                onChange={handleFilesProjectsSelected}
                multiple
              />

              <div className="mt-4 space-y-3">
                {filesProjects.map((file) => {
                  return (
                    <div
                      key={file.name}
                      className="group flex items-start gap-4 rounded-lg border p-4"
                    >
                      <div className="rounded-full border-4 bg-zinc-300 border-zinc-200/40 p-2">
                        <UploadCloud className="h-4 w-4 text-zinc-600" />
                      </div>

                      <div className="flex flex-1 flex-col items-start gap-1">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {file.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {formatBytes(file.size)}
                          </span>
                        </div>

                        <div className="flex w-full items-center gap-3">
                          <Progress value={80} className="h-2" />
                          <span className="text-sm font-medium">80%</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="ml-auto rounded-md p-2 hover:bg-secondary"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-5">
            <Button variant="outline" size="sm">
              Cancelar
            </Button>
            <Button variant="default" size="sm" type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
