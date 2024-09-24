import { useEffect, useState } from 'react'

import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet
} from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'

function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: '8px' }}
      />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>

      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox({ title, itens }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({itens.length})
      </h2>
      {
        <ul>
          {/* {itens.map(item => (
            <li key={item.id}>
              <a href={`/users/${item.title}`}>
                <img src={item.image} />
                <span>{item.title}</span>
              </a>
            </li>
          ))} */}
        </ul>
      }
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [comunidades, setComunidades] = useState([])

  const [followers, setFollowers] = useState([])

  const githubUser = 'GabrielRARodrigues'
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]

  useEffect(() => {
    fetch('https://api.github.com/users/GabrielRARodrigues/followers')
      .then(serverResponse => serverResponse.json())
      .then(fullResponse => {
        setFollowers(fullResponse)
      })

    fetch('/api/communities')
      .then(response => response.json())
      .then(fullResponse => {
        const communities = fullResponse
        setComunidades(communities)
      })
  }, [])

  function handleCreateCommunity(e) {
    e.preventDefault()
    const formData = new FormData(e.target)

    const comunidade = {
      title: formData.get('title'),
      imageUrl: formData.get('image'),
      creatorSlug: githubUser
    }

    fetch('/api/communities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comunidade)
    }).then(async response => {
      const data = await response.json()

      const community = await data.createdRecord

      const comunidadesAtualizadas = [...comunidades, community]

      setComunidades(comunidadesAtualizadas)
    })
  }

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input
                  type="text"
                  name="title"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="image"
                  placeholder="Coloque uma URL para usarmos de capa"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: 'profileRelationsArea' }}
        >
          <ProfileRelationsBox title="Seguidores" itens={followers} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Comunidades ({comunidades.length})</h2>
            {
              <ul>
                {comunidades.map(comunidade => (
                  <li key={comunidade.id}>
                    <a href={`/communities/${comunidade.id}`}>
                      <img src={comunidade.imageUrl} />
                      <span>{comunidade.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            }
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map(pessoa => (
                <li key={pessoa}>
                  <a href={`/users/${pessoa}`}>
                    <img src={`https://github.com/${pessoa}.png`} />
                    <span>{pessoa}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
